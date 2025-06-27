ip := `hostname -I | awk '{print $1}'`
default_port := "4200"

default: start

build:
  npm run build

gendb:
  ./generatedb.sh

start:
  npm run start

start-bind port=default_port:
  ng serve --host {{ip}} --port {{port}}