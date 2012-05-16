x = ds.Course.query('year = 1999');

x = x[0];
//x = x.courseTeacher; //N > 1 on single entity
//x = x.attendees.theStudent; //1 > N on single entity

//x = ds.Teacher.query('ID < 20');
//x = x[0];

//x = x.coursesTaught.name;//.length;

//x = x.coursesTaught.distinctValues('name');//.length;

//x = ds.Course.query('courseTeacher.last = Za*'); //all Courses where the teacher's last name starts with Za
//x = ds.Attendee.query('theStudent.first = Fred'); // all attendees for for students named Fred
//x = ds.Teacher.query('coursesTaught.name = Psy*'); //all teachers that teach a corse starting with Psy


x;