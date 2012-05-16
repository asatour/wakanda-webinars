
guidedModel =// @startlock
{
	Teacher :
	{
		fullName :
		{
			onGet:function()
			{// @endlock
				return this.first + ' ' + this.last;
			}// @startlock
		}
	},
	Attendee :
	{
		grade :
		{
			onGet:function()
			{// @endlock
				var gp = {}; //could define this ahead of time but left here for clarity
				gp['0'] = 'F';
				gp['1'] = 'D';
				gp['1.33'] = 'D+';
				gp['1.67'] = 'C-';
				gp['2'] = 'C';
				gp['2.33'] = 'C+';
				gp['2.67'] = 'B-';
				gp['3'] = 'B';
				gp['3.33'] = 'B+';
				gp['3.67'] = 'A-';
				gp['4'] = 'A';
				if (gp[this.gradePoint] != null)
					return gp[this.gradePoint];
				else
					return '';
			},// @startlock
			onSet:function(value)
			{// @endlock
				var gp = {}; //could define this ahead of time but left here for clarity
				gp['F'] = 0;
				gp['D'] = 1;
				gp['D+'] = 1.33;
				gp['C-'] = 1.67;
				gp['C'] = 2;
				gp['C+'] = 2.33;
				gp['B-'] = 2.67;
				gp['B'] = 3;
				gp['B+'] = 3.33;
				gp['A-'] = 3.67;
				gp['A'] = 4;
				value = value.toUpperCase();
				this.gradePoint = gp[value];
			},// @startlock
			onQuery:function(compOperator, valueToCompare)
			{// @endlock
				valueToCompare = valueToCompare.toUpperCase();
				var gp = {}; //could define this ahead of time but left here for clarity
				gp['F'] = 0;
				gp['D'] = 1;
				gp['D+'] = 1.33;
				gp['C-'] = 1.67;
				gp['C'] = 2;
				gp['C+'] = 2.33;
				gp['B-'] = 2.67;
				gp['B'] = 3;
				gp['B+'] = 3.33;
				gp['A-'] = 3.67;
				gp['A'] = 4;
				if (gp[valueToCompare] != null)
					return 'gradePoint ' + compOperator + gp[valueToCompare];
				else
					return 'gradePoint = -1'; //force a bad result
			},// @startlock
			onSort:function(ascending)
			{// @endlock
				if (ascending)
					return 'gradePoint';
				else
					return 'gradePoint desc';
			}// @startlock
		}
	},
	Student :
	{
		methods :
		{// @endlock
			getRandom:function(howMany)
			{// @lock
				var thePeople = ds.Student.createEntityCollection();
				var countStudents = ds.Student.length;
				var allPeople = ds.Student.all();
				for(var i = 1; i <= howMany; i++)
				{
					var randomPosition = Math.round(Math.random() * countStudents);
					var randomPerson = allPeople[randomPosition];
					thePeople.add(randomPerson);
				}
				return thePeople;
			}// @startlock
		},
		fullName :
		{
			onGet:function()
			{// @endlock
				return this.first + ' ' + this.last;
				
			}// @startlock
		}
	}
};// @endlock
