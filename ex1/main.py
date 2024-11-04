'''
In a more complex program, we might want to:
- create a User class 
- consider a different data container other than list (one which would support faster queries)
'''
users = [
    (1, "raj"),
    (2, "bob"),
    (3, "cody"),
    (4, "jack"),
    (5, "tom"),
];

'''
At the current moment, this does not handle invalid input (i.e. non integer). A more complete 
program would include error handling.
'''
userId = int(input("Enter a user id: "));
userName = next(filter(lambda user: user[0] == userId, users), None)
print(f"Name: {userName}" if userName else f"Error, user with id {userId} not found")

