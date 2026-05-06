
# Stage 1 - API Design

For the notification system, basic REST APIs are required so that students can receive updates related to placements, events, and results.

## Create Notification

Endpoint:

POST /api/notifications

Sample Request:

```json
{
  "studentId": 1042,
  "type": "Placement",
  "message": "AMD is hiring for internships"
}
```

Sample Response:

```json
{
  "success": true,
  "notificationId": "notif101"
}
```

---

## Fetch Notifications

Endpoint:

GET /api/notifications/:studentId

This API returns all notifications for a particular student.


## Mark as Read

Endpoint:

PATCH /api/notifications/:id/read

This updates notification status from unread to read.


# Stage 2 - Database Design

I would prefer MongoDB for this system because notifications are generated continuously and MongoDB handles large amounts of data efficiently.

Sample Notification Document:

```json
{
  "studentId": 1042,
  "type": "Placement",
  "message": "Company hiring update",
  "isRead": false,
  "createdAt": "timestamp"
}
```

Indexes can be created on:
- studentId
- isRead
- createdAt

This improves searching and sorting speed.


# Stage 3 - Query Optimization

Original Query:

```sql
SELECT * FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC;
```

Problems:
- fetching all columns unnecessarily
- sorting becomes slower for huge datasets
- no indexing used

Optimized Query:

```sql
SELECT id, type, message, createdAt
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC
LIMIT 50;
```

Suggested Index:

```sql
CREATE INDEX idx_notifications
ON notifications(studentID, isRead, createdAt DESC);
```

This reduces query execution time significantly.


# Stage 4 - Performance Improvements

If notifications increase for thousands of students, performance issues can occur.

To improve scalability:

## Pagination

Notifications can be loaded in smaller batches instead of all at once.

## Redis Caching

Frequently accessed notifications can be stored temporarily in Redis.

## WebSockets

Instead of refreshing repeatedly, notifications can be pushed in real-time.

## Lazy Loading

Older notifications can load only when the user scrolls.


# Stage 5 - Notification Processing Redesign

In the current sequential approach, one failure can stop the complete process.

A better approach is asynchronous processing using queues.

Flow:

Request → Queue → Worker → Notification Service

Technologies that can be used:
- RabbitMQ
- Kafka
- Redis Queue

Advantages:
- better scalability
- retry support
- fault tolerance
- faster processing


# Stage 6 - Top Notifications Algorithm

To display important unread notifications first, notifications can be prioritized based on:
- notification type
- latest timestamp

Priority Order:
1. Placement
2. Result
3. Event

Approach:
- assign priority values
- sort notifications
- return top 10 notifications

Time Complexity:

O(n log n)

because sorting is used.

---