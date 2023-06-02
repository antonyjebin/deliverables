pipeline {

  environment {
    dockerimagename = "antonyjebinraj/nodeapp"
    dockerImage = ""
  }

  agent any

  stages {

    stage('Checkout Source') {
      steps {
        git credentialsId: 'your_credentials_id', url: 'https://github.com/antonyjebin/deliverables.git'
      }
    }

    stage('Build image') {
      steps{
        script {
          dockerImage = docker.build dockerimagename
        }
      }
    }

    stage('Pushing Image') {
      environment {
               registryCredential = 'dockerhub'
           }
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("latest")
          }
        }
      }
    }

    stage('Deploy App to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "deploy.yaml", kubeconfigId: "k8s")
        }
      }
    }
    stage('Service App to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "service.yaml", kubeconfigId: "k8s")
        }
      }
    }
    


  }

}
