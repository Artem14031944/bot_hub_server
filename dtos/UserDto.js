class UserDto {
    id;
    email;
    username;
    is_admin;

    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.username = model.username;
        this.is_admin = model.is_admin;
    };
};

export default UserDto;