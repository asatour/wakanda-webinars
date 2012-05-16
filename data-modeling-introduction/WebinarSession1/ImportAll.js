function importData()
{
	var folder = ds.getModelFolder();
	if (folder != null)
	{
		var thePath = folder.path;
		var baseFolder = thePath + 'ImportData/';
		var file = File(baseFolder + 'NamesAddressesNumbers.txt');
		
		if (ds.Student.length == 0)
		{
			var input = TextStream(file,'read');
			if (!input.end())
			{
				var record = input.read('\r');
				if (record = 'First\tLast\tAddress\tCity\tState\tZip\tPhone') //verify that the file is in the right format
				{
					while (!input.end())
					{
						record = input.read("\r"); //read one row
						if (record != "")
						{
							var columnArray = record.split('\t');
							if (columnArray.length == 7)
							{
								var newPerson = new ds.Student({
									first: columnArray[0],
									last: columnArray[1]
									});
								newPerson.save();
							}
						}
					}
				}
			}	
		}

		var file = File(baseFolder + 'CourseNameDeptCode.txt');
		var arrCourseNames = [];
		
		if (ds.Course.length == 0)
		{
			var input = TextStream(file,'read');
			if (!input.end())
			{
				var record = input.read('\r');
				if (record = 'Name\tDepartment\tCode') //verify that the file is in the right format
				{
					while (!input.end())
					{
						record = input.read('\r'); //read one row
						if (record != '')
						{
							var columnArray = record.split('\t');
							if (columnArray.length == 3)
							{
								arrCourseNames.push(columnArray[0])
							}
						}
					}
				}
			}
		}

		var file = File(baseFolder + 'ClassLocSchedSem.txt');
		if (ds.Course.length == 0)
		{
			var input = TextStream(file,'read');
			if (!input.end())
			{
				var record = input.read('\r');
				if (record = 'Location\tSchedule\tSemester') //verify that the file is in the right format
				{
					var allTeachers = ds.Student.getRandom(200); 
					
					allTeachers.forEach(function(loopStudent){
						var newTeach = new ds.Teacher();
						newTeach.first = loopStudent.first;
						newTeach.last = loopStudent.last;
						newTeach.save();
					});
					allTeachers = ds.Teacher.all(); 

					while (!input.end())
					{
						//var allCourseMasters = ds.Course.all();
						var countCourses = arrCourseNames.length;
						
						//restrict so that same person teaches multiple courses
						
						record = input.read('\r'); //read one row
						if (record != '')
						{
							var randomCoursePosition = Math.round(Math.random() * countCourses);
							var randomCourse = arrCourseNames[randomCoursePosition];

							var randomTeacherPosition = Math.round(Math.random() * allTeachers.length);
							var randomTeacher = allTeachers[randomTeacherPosition];
						
							var columnArray = record.split('\t');
							if (columnArray.length == 3)
							{
								var theYear = columnArray[2].substr(0,4);
								var theSemester = columnArray[2].substr(5);
								var newCourse = new ds.Course({
									schedule: columnArray[1],
									year: theYear,
									semester: theSemester,
									name: randomCourse,
									courseTeacher: randomTeacher 
								});
								newCourse.save();
							}
						}
					}
				}
			}
		}
		
		

	}
};
 function makeAttendees(howManyPerSemester)
{
	var grades = [2, 2.33, 2.67, 3, 3.33, 3.67, 4];
	var semesters = ['Spring', 'Fall', 'Winter', 'Summer'];
	
	var allStudents = ds.Student.getRandom(500); 
						
	allStudents.forEach(function(theStudent)
	{
		var randomStartYear = 1991 + Math.round(Math.random() * 19)
		for(var year = 0; year <=3; year++)
		{			
			for(var semester = 0; semester <= 3; semester++)
			{
				var theSemester = semesters[semester];
				var semesterCourses = ds.Course.query('semester = :1 AND year = :2', theSemester, (randomStartYear + year));
				if (semesterCourses.length > 0)
				{
					for(var i = 1; i <= howManyPerSemester; i++)
					{
						var randomCoursePosition = Math.round(Math.random() * semesterCourses.length);
						var randomCourse = semesterCourses[randomCoursePosition];
						var randomGrade = grades[Math.round(Math.random() * (grades.length - 1))];
						if (randomCourse != null)
						{
							var newAttendee = new ds.Attendee({
								theStudent : theStudent,
								theCourse : randomCourse,
								gradePoint : randomGrade
							});
							newAttendee.save();
						}
					}
				}
			}
		}
		theStudent.enrolled = true;
		theStudent.save();
	});
}

//ds.Attendee.all().remove();
//ds.Course.all().remove();
//ds.Student.all().remove();
//ds.Teacher.all().remove();


//			
importData();
makeAttendees(4);

ds.Attendee.length + '  ' + ds.Course.length + '  ' + ds.Student.length + '  ' + ds.Teacher.length;




