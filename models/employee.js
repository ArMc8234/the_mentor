module.exports = function (sequelize, DataTypes) {
    var Employee = sequelize.define("Employee", {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        // birth_date:DataTypes.DATE,
        // hire_date:DataTypes.DATE,
        // gender: DataTypes.ENUM('M','F')
        email: DataTypes.STRING,
        Password: DataTypes.STRING,
        job_title: DataTypes.STRING,
        education: DataTypes.STRING,
        manager: DataTypes.STRING,
        department: DataTypes.STRING,
        active: DataTypes.BOOLEAN
    });
    
    Employee.associate = function(modules){
        Employee.belongsTo(modules.Department,{
            foreignkey:{
                allowNull:false
            }
        });
    };
    return Employee;
};