class UserDto {
    id;
    email;
    username;
    role;

    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.username = model.name;
        this.role = model.role;
    };
};

export default UserDto;