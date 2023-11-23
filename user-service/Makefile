start_db:
	docker-compose up

stop_db:
	docker-compose down

migrate:
	db-migrate up

migrate-down:
	db-migrate down

.PHONEY: start_db stop_db migrate migrate-down