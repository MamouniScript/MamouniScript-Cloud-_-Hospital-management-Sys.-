# Cloud-_-Hospital-management-Sys.-

# Hospital Management System

A **fully containerized Hospital Management System** using Docker, ready to be deployed anywhere. This system includes multiple microservices for authentication, patient management, rendezvous (appointments), medical staff management, and more. It also integrates a database service, an admin panel, and a gateway for seamless communication between services.

## Features

- **Microservices Architecture**: Independent services for authentication, patients, appointments, doctors, and more.
- **Centralized Configuration**: Eureka server for service discovery and load balancing.
- **Secure and Scalable**: Built with Spring Boot, Docker, and React.
- **Database Management**: MySQL database with phpMyAdmin for easy administration.
- **Frontend**: React-based admin dashboard served using an Nginx container.
- **Ready for Deployment**: Fully containerized with Docker Compose for easy setup and deployment.

---

## Project Structure

```
├── authentication-service        # Handles user authentication and authorization
├── patient-service               # Manages patient records
├── rendezvous-service            # Handles appointments
├── medecin-service               # Manages doctors and their schedules
├── api-gateway-service           # Acts as a gateway for routing API requests
├── eureka-service                # Service discovery server
├── mysql                         # MySQL database
├── phpmyadmin                    # Admin panel for MySQL
├── react-frontend                # React-based admin dashboard
└── docker-compose.yml            # Docker Compose file for deployment
```

---

## Prerequisites

Ensure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/your-username/hospital-management-system.git
cd hospital-management-system
```

### Build and Run the Containers

1. **Ensure Docker is running.**
2. Run the following command:

```bash
docker-compose up --build
```

### Access the Application

- **Frontend Dashboard**: [http://localhost:3000](http://localhost:3000)
- **PhpMyAdmin**: [http://localhost:7081](http://localhost:7081)
  - Username: `root`
  - Password: `password`

---

## Microservices

### Authentication Service
- **Port**: `8095`
- **Description**: Manages user login, registration, and role-based authentication.

### Patient Service
- **Port**: `8085`
- **Description**: CRUD operations for managing patient information.

### Rendezvous Service
- **Port**: `8086`
- **Description**: Handles scheduling and managing appointments.

### Medecin Service
- **Port**: `8084`
- **Description**: Manages doctor information and schedules.

### API Gateway
- **Port**: `8762`
- **Description**: Routes API requests to the appropriate microservices.

### Eureka Server
- **Port**: `8761`
- **Description**: Provides service discovery and load balancing.

---

## Database Setup

- **Database**: MySQL
- **PhpMyAdmin**: Included for database management.
- Database credentials are pre-configured in `docker-compose.yml`.

---

## Deployment

### Local Deployment

1. Start the application with Docker Compose:
   ```bash
   docker-compose up -d
   ```
2. Verify the containers:
   ```bash
   docker ps
   ```

### Cloud Deployment

1. Push the Docker images to your Docker Hub:
   ```bash
   docker tag <image-name> <your-dockerhub-username>/<image-name>
   docker push <your-dockerhub-username>/<image-name>
   ```
2. Use a cloud provider (AWS, Azure, GCP, etc.) to run the containers.

---

## Technologies Used

- **Backend**: Spring Boot (Java)
- **Frontend**: React with Nginx
- **Database**: MySQL with phpMyAdmin
- **Containerization**: Docker, Docker Compose
- **Service Discovery**: Eureka Server
- **API Gateway**: Spring Cloud Gateway

---

## Future Improvements

- Add monitoring tools (e.g., Prometheus, Grafana).
- Implement CI/CD pipelines.
- Enhance security (e.g., HTTPS support).

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Submit a pull request.

---