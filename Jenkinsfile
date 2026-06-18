pipeline {
    agent any

    environment {
        AWS_BUCKET = "taskapp-staging-619434110426-eu-central-1"
        AWS_REGION = "eu-central-1"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                url: 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'if [ -f package.json ]; then npm install; else echo "No Node project"; fi'
            }
        }

        stage('Test') {
            steps {
                sh 'if [ -f package.json ]; then npm test --if-present; else echo "No tests"; fi'
            }
        }

        stage('Build') {
            steps {
                sh 'if [ -f package.json ]; then npm run build --if-present; else echo "No build step"; fi'
            }
        }

        stage('Deploy to S3') {
            steps {
                sh '''
                if [ -d build ]; then
                    aws s3 sync build/ s3://$AWS_BUCKET --delete
                elif [ -d dist ]; then
                    aws s3 sync dist/ s3://$AWS_BUCKET --delete
                else
                    aws s3 cp index.html s3://$AWS_BUCKET/
                fi
                '''
            }
        }
    }
}