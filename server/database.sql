-- CREATE DATABASE University;

CREATE TABLE student(
    student_id VARCHAR(10) PRIMARY  KEY,
    student_name VARCHAR(255) NOT NULL,
    father_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(12) NOT NULL,
    semester_no VARCHAR(5) NOT NULL,
    section CHAR(1) NOT NULL,
    address VARCHAR(255) NOT NULL,
    loginPassword VARCHAR(255) NOT NULL
);

CREATE TABLE teacher(
    teacher_id SERIAL PRIMARY KEY ,
    teacher_email varchar(255) NOT NULL,
    teacher_name VARCHAR(255) NOT NULL,
    loginPassword VARCHAR(255) NOT NULL,
    Constraint uniq_email Unique(teacher_email)
);

Create Table Admin(
    admin_id SERIAL PRIMARY key,
    amdin_email VARCHAR(255) NOT NULL,
    admin_name VARCHAR(255) NOT NULL,
    loginPassword VARCHAR(255) NOT NULL
);


CREATE TABLE course_available(
    course_code VARCHAR(15) PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credit_hours INT NOT NULL,
    Constraint fk Foreign Key(course_code) REFERENCES course(course_code)
);


CREATE TABLE course(
    course_code VARCHAR(15) PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credit_hours INT NOT NULL , 
    teacher_email VARCHAR(255) NOT NULL,
    teacher_name varchar(255) NOT NULL,
    Constraint fk_teacher Foreign key(teacher_email) REFERENCES teacher(teacher_email)
 );


CREATE TABLE course_register(
    course_code VARCHAR(15) NOT NULL,
    student_id VARCHAR(10) NOT NULL,
    
    Constraint pkey PRIMARY KEY( course_code , student_id)


);

CREATE TABLE Attendance(
    course_code VARCHAR(15) NOT NULL,
    student_id VARCHAR(10) ,
    attendancedate DATE NOT NULL,
    attented varchar(1) NOT NULL,
     Constraint pkeyy PRIMARY KEY(student_id , course_code , attendancedate),
     Constraint fkey_1 Foreign Key(student_id) REFERENCES student(student_id),
    Constraint fkey_2 Foreign Key(course_code) REFERENCES course(course_code)
);

 CREATE TABLE marks(
          student_id VARCHAR(10) NOT NULL,
          course_code VARCHAR(15) NOT NULL,
          mid_1 INT,
          mid_2 INT,
          quiz INT ,
          assignment INT,
          project INT,
          final_Exam INT,
          total INT,
          grade varchar(3),
          Constraint marks_pkey PRIMARY KEY(student_id , course_code),
          Constraint fkey_1 Foreign Key(student_id) REFERENCES student(student_id),
          Constraint fkey_2 Foreign Key(course_code) REFERENCES course(course_code)
);
-- Update marks set mid_1 =   Where student_id =   AND course_code =  ;
-- Select SUM(total) / Count(student_id) from marks where course_code = ' ';  ///average
-- Select Max(total) from marks where course_code = ; //maximum numbers
-- Select Min(total) from marks where course_code = ; //maximum numbers 
-- Select total from marks where student_id = and course_code = ;




-- INSERT INTO student(student_id , student_name , father_name , phone_number , semester_no , section, address , loginPassword) VALUES ('19k0281' , 'Muhammad Ali' , 'Ayaz Ali' , '03133415124','5' , 'Sukkur','E' , '2');
-- INSERT INTO student(student_id , student_name , father_name , phone_number , semester_no , section, address , loginPassword) VALUES ('19k0280' , 'Muhammad Mateen' , 'Ayaz Ali' , '03133415123','5' , 'Sukkur','E' , '1');
-- INSERT INTO student(student_id , student_name , father_name , phone_number , semester_no , section, address , loginPassword) VALUES ('19k0282' , 'Muhammad Ahmed' , 'Muhammad Mateen' , '03133415125','5' , 'Sukkur','E' , '3');
-- INSERT INTO student(student_id , student_name , father_name , phone_number , semester_no , section, address , loginPassword) VALUES ('19k0283' , 'Muhammad Wahaj' , 'Muhammad Mateenn' , '03133415126' ,'5', 'Sukkur','E', '4');
-- INSERT INTO student(student_id , student_name , father_name , phone_number , semester_no , section, address , loginPassword) VALUES ('19k0284' , 'Muhammad Shayan' , 'Muhammad Mateen' , '03133415127','5' , 'Sukkur','E' , '5');
-- INSERT INTO student(student_id , student_name , father_name , phone_number , semester_no , section, address , loginPassword) VALUES ('19k0285' , 'Muhammad Shamil' , 'Muhammad Mateen' , '03133415128','5' , 'Sukkur','E' , '6');
-- INSERT INTO student(student_id , student_name , father_name , phone_number , semester_no , section, address , loginPassword) VALUES ('19k0286' , 'Muhammad Ayuub' , 'Muhammad Mateen' , '03133415113','5', 'Sukkur','E' , '8');
-- INSERT INTO student(student_id , student_name , father_name , phone_number , semester_no , section, address , loginPassword) VALUES ('19k0287' , 'Muhammad Affan' , 'Muhammad Mateen' , '0313341553','5' , 'Sukkur','E' , '9');
-- INSERT INTO student(student_id , student_name , father_name , phone_number , semester_no ,  address , loginPassword) VALUES ('19k0289' , 'Muhammad Asif' , 'Muhammad Mateen' , '03133415143','5' , 'Sukkur', '10');


-- //Teachers
-- INSERT INTO teacher(teacher_id , teacher_email , teacher_name , loginPassword) VALUES (DEFAULT , 'abeer.gauher@nu.edu.pk' , 'Abeer Gauher' , '1');
-- INSERT INTO teacher(teacher_id , teacher_email , teacher_name , loginPassword) VALUES (DEFAULT , 'amber.shaikh@nu.edu.pk' , 'Amber' , '2');
-- INSERT INTO teacher(teacher_id , teacher_email , teacher_name , loginPassword) VALUES (DEFAULT , 'basit.jasani@nu.edu.pk' , 'Basit Jasani' , '3');

-- //Courses Data
-- INSERT INTO course(course_code , course_name , credit_hours , teacher_email,teacher_name ) VALUES ('CS300' , 'Database' , 3 , 'abeer.gauher@nu.edu.pk' , 'Abeer Gauher');
-- INSERT INTO course(course_code , course_name , credit_hours , teacher_email,teacher_name ) VALUES ('MT3001' , 'Calculas' , 3 , 'amber.shaikh@nu.edu.pk' , 'Amber');
-- INSERT INTO course(course_code , course_name , credit_hours , teacher_email,teacher_name ) VALUES ('CS3002' , 'Data Structures' , 3 , 'basit.jasani@nu.edu.pk' , 'Basit Jasani');

-- //Marks Data
-- INSERT INTO marks(student_id , course_code , mid_1 , mid_2) VALUES ('19k02811' , 'CS300' , 10 , 10);
-- INSERT INTO marks(student_id , course_code , mid_1 , mid_2 , quiz , assignment , project , final_Exam ) VALUES ('19k02811' , 'CS3002' , 0 , 0 , 0 , 0 , 0 , 0);

