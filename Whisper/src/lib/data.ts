export const MOCK_LOGS = `error: [app-backend-78c9f4d4f6-z4k5j] 500 - POST /api/v1/orders - Database query failed: connection terminated unexpectedly
info: [app-backend-78c9f4d4f6-z4k5j] Processing new order: a1b2c3d4
warn: [app-backend-78c9f4d4f6-z4k5j] High memory usage: 92%
error: [db-primary-0] FATAL: terminating connection due to administrator command
info: [db-primary-0] database system is ready to accept connections
error: [app-backend-78c9f4d4f6-x9v8l] 500 - GET /api/v1/products - Database query failed: connection terminated unexpectedly
info: [app-backend-78c9f4d4f6-x9v8l] Health check OK
error: [app-backend-78c9f4d4f6-n3m4p] 500 - POST /api/v1/cart - Database query failed: connection terminated unexpectedly
`;

export const MOCK_METRICS = `- service: app-backend
  metric: cpu_utilization
  value: 65%
- service: app-backend
  metric: memory_utilization
  value: 92%
- service: app-backend
  metric: p99_latency_ms
  value: 1250
- service: db-primary
  metric: cpu_utilization
  value: 88%
- service: db-primary
  metric: active_connections
  value: 2 (was 150)
- service: load-balancer
  metric: 5xx_errors
  value: 48 (rate increasing)
`;
