.PHONY: prepare magneticod magneticow

all: prepare magneticod magneticow

prepare:
	printf "Downloading required Modules\n"
	go mod download github.com/ez-me/magnetico
	go get github.com/ez-me/magnetico/cmd/magneticod
	go get github.com/ez-me/magnetico/cmd/magneticow

magneticod:
	go build --tags fts5 "-ldflags=-s -w -X main.compiledOn=`date -u +%Y-%m-%dT%H:%M:%SZ`" ./cmd/magneticod

magneticow:
	# https://github.com/kevinburke/go-bindata
	go-bindata -pkg "main" -o="cmd/magneticow/bindata.go" -prefix="cmd/magneticow/data/" cmd/magneticow/data/...
	sed -i '1s;^;//lint:file-ignore * Ignore file altogether\n;' cmd/magneticow/bindata.go
	go build --tags fts5 "-ldflags=-s -w -X main.compiledOn=`date -u +%Y-%m-%dT%H:%M:%SZ`" ./cmd/magneticow
