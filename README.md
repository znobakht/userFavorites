# readme
# gitIgnore
    node_moduls and package-lock are unnecessary.
    coverage folder that is output of test isn't requiered to push to git.
    dist folder is the output of build and isn't required to push.
# profile Model
    email and password are required to secure login and etc.
    adding interface to be sure about format of inputs.
    using profileInterface in profileSchema and model definition.
    adding a function for generating jwt token.
        this token will expire after 5 days.

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

# package.json 
    
    for 'start' script, needs to look at dist/src folder. before start script, must run build script.
    for 'test', uses jest and running tests one by one.
    some scripts are necessary for jest to run correctly.