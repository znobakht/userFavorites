# readme
# gitIgnore
    node_moduls and package-lock are unnecessary.
# profile Model
    email and password are required to secure login and etc.
    adding interface to be sure about format of inputs.
    using profileInterface in profileSchema and model definition.
    adding a function for generating jwt token.

# config.ts file
    a default value added for dataBase url.
    secretKey is a key for generating jwt.

# RoleNames
    some routes only admin can access them. For example, only admin can see all profiles.

# profile router
    register: when user requests POST to /api/profile.
        at first, checking if the user existed or not.
        if not, hashing its password and creating new database object.
        in response, sending user's informations and _id. (password wont be sent)