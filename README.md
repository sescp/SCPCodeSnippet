# SCPCodeSnippet

# Problem Statement 1: 4th October 2018
Say, we have an array of JSON. each JSON object consists of "date" and "value" as attribute key. Here, the objective is to finding the unique records of this JSON Array based on one attribute(say, date). Also summation of other attribute (i.e. value) based on the unique date.

# Input/output:
Input: 
[{"date":"23-9-18","value":"29"},{"date":"23-9-18","value":"39"},{"date":"24-9-18","value":"10"},{"date":"24-9-18","value":"99"},{"date":"25-9-18","value":"40"}];

Output should be: 
[{"date":"23-9-18","value":"68"},{"date":"24-9-18","value":"109"},{"date":"25-9-18","value":"40"}];

# Solution:
Refer Solution1.js


# Problem Statement 2: 5th October 2018
How to do POST Service call in node.js

# Solution:
Refer Solution2.js


# Problem Statement 3: 10th October 2018
Implementing onBeforeShow function in SAP UI5

# Solution:
Refer Solution3.js

# Problem Statement 4: 6th February 2019
How to achieve multiple Workflow tasks approval

# Solution:
Refer workflowSolution.js 

# Problem Statement 5: 6th February 2019
With the help of Reacast creating records and calling  multiple API's of different systems(C4C,Hana DB).
Based on the user's selection webhook will be triggered with the help of Alias name the same name were included in the call.


# Solution:
Refer RecastNodejs.js 


# Problem Statement 6: 8th Feb 2019
# Input/output:
Input: 

Inspection Order	Operation	Inspection Characteristic	CharacteristicName	Inspected	Result
890000000156	             10	             10	            %Moisture          	1	     60
890000000156	             10	             20	             %OWM	              1	     80
890000000156	             10	             30	             O/DM	              1	      A
890000000156	             10	             40	             %NOS	              1	      40
890000000156	             10	             50	             %FFA	              1	      30



Output should be: 
{
                "Insplot": "890000000156",
                "Inspoper": "0010",
                "ResultChar": [{
                                                "Inspchar": "0010",
                                                "CharName": "%Moisture",
                                                "Inspected": 1,
                                                "Value": "60"
                                },
                                {
                                                "Inspchar": "0020",
                                                "CharName": "%OWM",
                                                "Inspected": 1,
                                                "Value": "80"
                                },
                                {
                                                "Inspchar": "0030",
                                                "CharName": "O/DM",
                                                "Inspected": 1,
                                                "Value": "A"
                                },
                                {
                                                "Inspchar": "0040",
                                                "CharName": "%NOS",
                                                "Inspected": 1,
                                                "Value": "40"
                                },
                                {
                                                "Inspchar": "0050",
                                                "CharName": "%FFA",
                                                "Inspected": 1,
                                                "Value": "30"
                                }

                    ]
}


# Solution:
Refer Solution4.js
