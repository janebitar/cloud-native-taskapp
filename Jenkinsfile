pipeline {
    agent any

    environment {
        AWS_BUCKET = "taskapp-staging-619434110426-eu-central-1"
        AWS_REGION = "eu-central-1"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                if [ -f package.json ]; then
                    npm install
                else
                    echo "No Node project"
                fi
                '''
            }
        }

        stage('Test') {
            steps {
                sh '''
                if [ -f package.json ]; then
                    npm test --if-present
                else
                    echo "No tests"
                fi
                '''
            }
        }

        stage('Build') {
            steps {
                sh '''
                if [ -f package.json ]; then
                    npm run build --if-present
                else
                    echo "No build step"
                fi
                '''
            }
        }

        stage('Debug Workspace') {
            steps {
                sh 'ls -R'
            }
        }

        stage('Deploy to S3') {
            steps {
                withAWS(credentials: 'aws-credentials', region: 'eu-central-1') {
                    sh '''
                    echo "Deploying backend/public to S3..."

                    if [ -d backend/public ]; then
                        aws s3 sync backend/public/ s3://taskapp-staging-619434110426-eu-central-1 --delete
                    else
                        echo "ERROR: backend/public folder not found"
                        ls -R
                        exit 1
                    fi
                    '''
                }
            }
        }
    }
}