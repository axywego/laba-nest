echo "Testing 5 laba"
curl -X GET http://localhost:3000/tasks
echo
echo "====================================================="
curl -X POST http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d '{"title":"Задача для юзера 1", "description":"Описание"}'
echo
echo "====================================================="
curl -X GET http://localhost:3000/tasks/1
echo
echo "====================================================="
curl -X PUT http://localhost:3000/tasks/1 -H "Content-Type: application/json" -d '{"title":"Обновлённая задача", "completed":true}'
echo
echo "====================================================="
curl -X DELETE http://localhost:3000/tasks/1
echo
echo "====================================================="
echo
echo "Testing 6 laba"
echo
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"username":"bababa", "email":"test555@example.com"}'
echo
echo "====================================================="
curl -X GET http://localhost:3000/users/1
echo
echo "====================================================="
curl -X GET http://localhost:3000/tasks/user/1
echo
echo "====================================================="