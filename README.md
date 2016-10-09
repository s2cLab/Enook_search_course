# Enook_search_course

## 환경 구축

### Elasticsearch설치

-설치 환경 : Unbuntu 16.04

-Mecab버전에 맞는 Elasticsearch버전 설치(2.4.0 예시)

    cd ~/
    curl -L -O https://download.elastic.co/elasticsearch/release/org/elasticsearch/distribution/tar/elasticsearch/2.4.0/elasticsearch-2.4.0.tar.gz
    tar -xvf elasticsearch-2.4.0.tar.gz
    cd elasticsearch-2.4.0
    
### mecab-ko(형태소 분석기 엔진)과 mecab-ko-dic(사전 파일) 설치

#### mecab-ko
    cd ~/
    mkdir Mecab-ko
    wget https://bitbucket.org/eunjeon/mecab-ko/downloads/mecab-0.996-ko-0.9.2.tar.gz
    tar zxfv mecab-0.996-ko-0.9.2.tar.gz
    cd mecab-0.996-ko-0.9.2
    make
    make check
    sudo make install
