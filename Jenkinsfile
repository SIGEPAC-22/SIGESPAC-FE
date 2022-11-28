pipeline {
  agent any
  environment {
    name_final = "sigespac-fe"
  }
  stages {
    stage('Docker Build') {
      agent {
        label 'dev'
      }
      steps {
        script {
          def result = sh(returnStdout: true, script: 'echo "$(docker ps -q --filter name=${name_final})"').trim()
          if (result != "") {
            sh '''
            docker stop ${name_final}
            docker rm -vf ${name_final}
            docker build . -t ${name_final}
            docker system prune -f
	    '''
          } else {
            sh '''
            docker build . -t ${name_final}
            docker system prune -f
	    '''
          }
        }
      }
    }
    stage('Deploy to DEV') {
      agent {
        label 'dev'
      }
      steps {
        script {
          sh '''
          docker run -dt -p 30007:3000 --name ${name_final} ${name_final}
          docker system prune -f
	  '''
        }
      }
    }
    stage('Deploy to QA') {
      agent {
        label 'qa'
      }
      when {
        anyOf {
          branch 'sprint-*'
          branch 'master'
        }
      }
      steps {
        script {
          def result = sh(returnStdout: true, script: 'echo "$(docker ps -q --filter name=${name_final})"').trim()
          if (result != "") {
           sh '''
            docker stop ${name_final}
            docker rm -vf ${name_final}
            docker build . -t ${name_final}
            docker run -dt -p 30107:3000 --name ${name_final} ${name_final}
            docker system prune -f
	    '''
          } else {
            sh '''
            docker build . -t ${name_final}
            docker run -dt -p 30107:3000 --name ${name_final} ${name_final}
            docker system prune -f
	    '''
          }
        }
      }
    }
    stage('QA Approval') {
      agent {
        label 'prd'
      }
      when {
          branch 'master'
      }
      steps {
        input "Aprobacion Tester QA"
      }
    }
    stage('Deploy to PRD') {
      agent {
        label 'prd'
      }
      when {
          branch 'master'
      }
      steps {
        script {
          def result = sh(returnStdout: true, script: 'echo "$(docker ps -q --filter name=${name_final})"').trim()
          if (result != "") {
            sh '''
            docker stop ${name_final}
            docker rm -vf ${name_final}
            docker build . -t ${name_final}
            docker run -dt -p 30207:3000 --name ${name_final} ${name_final}
            docker system prune -f
	    '''
          } else {
            sh '''
            docker build . -t ${name_final}
            docker run -dt -p 30207:3000 --name ${name_final} ${name_final}
            docker system prune -f
	    '''
          }
        }
      }
    }
  }
}