# 1️⃣ CREATE – Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js + resources.js)
    participant B as Backend (Express Route)
    participant V as express-validator
    participant DB as PostgreSQL
    participant L as log.service.js

    U->>F: Fill form and click Create button
    F->>F: Client-side validation (isResourceNameValid, isResourceDescriptionValid)
    Note over F: Create button stays disabled until both fields are valid
    F->>B: POST /api/resources (JSON body)
    Note over F,B: { resourceName, resourceDescription,<br/>resourceAvailable, resourcePrice, resourcePriceUnit }

    B->>V: Run resourceValidators (express-validator)
    V-->>B: Validation result

    alt Validation fails (400)
        B-->>F: 400 Bad Request + { ok: false, errors: [{field, msg}] }
        F-->>U: Show validation error list
    else Validation OK
        B->>DB: INSERT INTO resources (name, description, available, price, price_unit) RETURNING *

        alt Duplicate name – unique index violation (pg error 23505)
            DB-->>B: Error code 23505
            B->>L: logEvent – "Duplicate resource blocked"
            B-->>F: 409 Conflict + { ok: false, error: "Duplicate resource name" }
            F-->>U: Show duplicate error message
        else Insert success
            DB-->>B: Inserted row (id, name, description, available, price, price_unit, created_at)
            B->>L: logEvent – "Resource created (ID x)"
            B-->>F: 201 Created + { ok: true, data: { ...resource } }
            F-->>U: Show success message
            F->>F: onResourceActionSuccess → clearResourceForm + loadResources()
            F->>B: GET /api/resources
            B->>DB: SELECT * FROM resources ORDER BY created_at DESC
            DB-->>B: All resource rows
            B-->>F: 200 OK + { ok: true, data: [...] }
            F-->>U: Re-render resource list
        end
    end
```

---

# 2️⃣ READ – Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (resources.js)
    participant B as Backend (Express Route)
    participant DB as PostgreSQL

    Note over U,F: Page load triggers loadResources()

    %% --- READ ALL ---
    rect rgb(240, 248, 255)
        Note over U,DB: READ ALL – GET /api/resources
        F->>B: GET /api/resources
        B->>DB: SELECT * FROM resources ORDER BY created_at DESC

        alt Database error
            DB-->>B: Error
            B-->>F: 500 Internal Server Error + { ok: false, error: "Database error" }
            F-->>U: renderResourceList([]) – empty list shown
        else Success
            DB-->>B: All resource rows
            B-->>F: 200 OK + { ok: true, data: [...] }
            F-->>U: renderResourceList – display buttons for each resource
        end
    end

    %% --- READ ONE (select from list) ---
    rect rgb(255, 248, 240)
        Note over U,DB: READ ONE – User clicks a resource in the list
        U->>F: Click resource button (data-resource-id)
        F->>F: Find resource in resourcesCache (in-memory)
        Note over F: No separate GET /:id call – data already cached from READ ALL
        F-->>U: selectResource(resource) – populate form fields, switch to edit mode
    end

    %% --- READ ONE via API (direct fetch) ---
    rect rgb(240, 255, 240)
        Note over U,DB: READ ONE via API – GET /api/resources/:id
        F->>B: GET /api/resources/123

        alt Invalid ID (NaN)
            B-->>F: 400 Bad Request + { ok: false, error: "Invalid ID" }
            F-->>U: Show error message
        else Resource not found
            B->>DB: SELECT * FROM resources WHERE id = $1
            DB-->>B: 0 rows
            B-->>F: 404 Not Found + { ok: false, error: "Resource not found" }
            F-->>U: Show not found message
        else Success
            B->>DB: SELECT * FROM resources WHERE id = $1
            DB-->>B: 1 row
            B-->>F: 200 OK + { ok: true, data: { ...resource } }
            F-->>U: Display resource data
        end
    end
```

---

# 3️⃣ UPDATE – Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js + resources.js)
    participant B as Backend (Express Route)
    participant V as express-validator
    participant DB as PostgreSQL
    participant L as log.service.js

    U->>F: Select resource from list
    F-->>U: Populate form fields, switch to edit mode (Update + Delete buttons)
    U->>F: Edit one or more fields
    F->>F: Client-side validation (isResourceNameValid, isResourceDescriptionValid)
    Note over F: Update button stays disabled until fields are valid AND something has changed
    U->>F: Click Update button

    alt Missing resource ID
        F-->>U: Show error – "missing resource ID, select a resource first"
    else ID present
        F->>B: PUT /api/resources/:id (JSON body)
        Note over F,B: { resourceName, resourceDescription,<br/>resourceAvailable, resourcePrice, resourcePriceUnit }

        alt Invalid ID (NaN)
            B-->>F: 400 Bad Request + { ok: false, error: "Invalid ID" }
            F-->>U: Show generic error message
        else Valid ID
            B->>V: Run resourceValidators (express-validator)
            V-->>B: Validation result

            alt Validation fails (400)
                B-->>F: 400 Bad Request + { ok: false, errors: [{field, msg}] }
                F-->>U: Show validation error list
            else Validation OK
                B->>DB: UPDATE resources SET name=$1 ... WHERE id=$6 RETURNING *

                alt Resource not found (0 rows updated)
                    DB-->>B: 0 rows returned
                    B-->>F: 404 Not Found + { ok: false, error: "Resource not found" }
                    F-->>U: Show not found message – "Refresh the list and try again"
                else Duplicate name – unique index violation (pg error 23505)
                    DB-->>B: Error code 23505
                    B-->>F: 409 Conflict + { ok: false, error: "Duplicate resource name" }
                    F-->>U: Show duplicate error message
                else Update success
                    DB-->>B: Updated row
                    B->>L: logEvent – "Resource updated (ID x)"
                    B-->>F: 200 OK + { ok: true, data: { ...resource } }
                    F-->>U: Show success message
                    F->>F: onResourceActionSuccess → clearResourceForm + loadResources()
                    F->>B: GET /api/resources
                    B->>DB: SELECT * FROM resources ORDER BY created_at DESC
                    DB-->>B: All resource rows
                    B-->>F: 200 OK + { ok: true, data: [...] }
                    F-->>U: Re-render resource list
                end
            end
        end
    end
```

---

# 4️⃣ DELETE – Resource (Sequence Diagram)

```mermaid
sequenceDiagram
    participant U as User (Browser)
    participant F as Frontend (form.js + resources.js)
    participant B as Backend (Express Route)
    participant DB as PostgreSQL
    participant L as log.service.js

    U->>F: Select resource from list
    F-->>U: Populate form fields, switch to edit mode (Update + Delete buttons)
    U->>F: Click Delete button
    Note over F: Delete button is always enabled in edit mode – no body validation required

    alt Missing resource ID
        F-->>U: Show error – "missing resource ID, select a resource first"
    else ID present
        F->>B: DELETE /api/resources/:id (no request body)

        alt Invalid ID (NaN)
            B-->>F: 400 Bad Request + { ok: false, error: "Invalid ID" }
            F-->>U: Show generic error message
        else Valid ID
            B->>DB: DELETE FROM resources WHERE id = $1

            alt Resource not found (rowCount = 0)
                DB-->>B: rowCount = 0
                B-->>F: 404 Not Found + { ok: false, error: "Resource not found" }
                F-->>U: Show not found message – "Refresh the list and try again"
            else Delete success
                DB-->>B: rowCount = 1
                B->>L: logEvent – "Resource deleted (ID x)"
                B-->>F: 204 No Content (empty body)
                F-->>U: Show success message – "successfully deleted!"
                F->>F: onResourceActionSuccess → clearResourceForm + loadResources()
                F->>B: GET /api/resources
                B->>DB: SELECT * FROM resources ORDER BY created_at DESC
                DB-->>B: Remaining resource rows
                B-->>F: 200 OK + { ok: true, data: [...] }
                F-->>U: Re-render resource list (deleted item no longer shown)
            end
        end
    end
```