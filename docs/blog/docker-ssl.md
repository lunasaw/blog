---
title: docker-ssl
date: 2021-05-09 21:07:10
banner_img: /img/docker.jpg
index_img: /img/docker.jpg
tags: 
 - docker
categories:
 - basic-component
 - docker
---

## 前言

**仅仅开放远程访问Docker API，这个还不够的，因为会有安全问题。关于这点，Docker有相关的安全机制，参考官方文档[Protect the Docker daemon socket](https://docs.docker.com/engine/security/https/)，大致就是：生成证书，用来达到验证客户端身份的目的。**

下面是操作步骤：

## 服务器配置

### 1. 创建certs文件夹，用来存放CA私钥和公钥

```
mkdir -pv /etc/docker/certs
cd /etc/docker/certs
```

### 2. 创建密码

**需要连续输入两次相同的密码**

```
openssl genrsa -aes256 -out ca-key.pem 4096
```

### 3. 依次输入密码、国家、省、市、组织名称等（除了密码外其他的可以直接回车跳过）

```
openssl req -new -x509 -days 365 -key ca-key.pem -sha256 -out ca.pem
```

### 4. 生成server-key.pem

```
openssl genrsa -out server-key.pem 4096
```

### 5. 生成server.csr（把下面的IP换成你自己服务器外网的IP或者域名）

```
openssl req -subj "/CN=123.123.123.123" -sha256 -new -key server-key.pem -out server.csr
```

### 6. 配置白名单

**0.0.0.0表示所有ip都可以连接。（这里需要注意，虽然0.0.0.0可以匹配任意，但是仍需要配置你的外网ip和127.0.0.1，否则客户端会连接不上）**

```
echo subjectAltName = IP:0.0.0.0,IP:123.123.123.123,IP:127.0.0.1 >> extfile.cnf
```

**或者也可以设置成域名**

```
echo subjectAltName = DNS:www.example.com,IP:123.123.123.123,IP:127.0.0.1 >> extfile.cnf
```

### 7. 将Docker守护程序密钥的扩展使用属性设置为仅用于服务器身份验证

```
echo extendedKeyUsage = serverAuth >> extfile.cnf
```

### 8.输入之前设置的密码，生成签名证书

```
openssl x509 -req -days 365 -sha256 -in server.csr -CA ca.pem -CAkey ca-key.pem \
  -CAcreateserial -out server-cert.pem -extfile extfile.cnf
```

### 9、生成供客户端发起远程访问时使用的key.pem

```
openssl genrsa -out key.pem 4096
```

### 10. 生成client.csr（把下面的IP换成你自己服务器外网的IP或者域名）

```
openssl req -subj "/CN=123.123.123.123" -new -key key.pem -out client.csr
```

### 11. 创建扩展配置文件，把密钥设置为客户端身份验证用

```
echo extendedKeyUsage = clientAuth > extfile-client.cnf
```

### 12. 生成cert.pem，输入前面设置的密码，生成签名证书

```
openssl x509 -req -days 365 -sha256 -in client.csr -CA ca.pem -CAkey ca-key.pem \
  -CAcreateserial -out cert.pem -extfile extfile-client.cnf
```

### 13. 删除不需要的配置文件和两个证书的签名请求

```
rm -v client.csr server.csr extfile.cnf extfile-client.cnf
```

### 14. 为了防止私钥文件被更改以及被其他用户查看，修改其权限为所有者只读

```
chmod -v 0400 ca-key.pem key.pem server-key.pem
```

### 15. 为了防止##### 公钥文件被更改，修改其权限为只读

```
chmod -v 0444 ca.pem server-cert.pem cert.pem
```

### 16. 修改Docker配置，使Docker守护程序仅接受来自提供CA信任的证书的客户端的连接

拷贝安装包单元文件到/etc，这样就不会因为docker升级而被覆盖

```
cp /lib/systemd/system/docker.service /etc/systemd/system/docker.service
```

在`ExecStart=/usr/bin/dockerd-current \`下面增加

```
--tlsverify \
--tlscacert=/etc/docker/certs/ca.pem \
--tlscert=/etc/docker/certs/server-cert.pem \
--tlskey=/etc/docker/certs/server-key.pem \
-H tcp://0.0.0.0:2376 \
-H unix:///var/run/docker.sock \
```

### 17. 重新加载daemon并重启docker

```
systemctl daemon-reload
systemctl restart docker
```

## 客户端配置

### 1. 创建证书目录

```
mkdir -pv ~/.docker/certs/
cd ~/.docker/certs/
```

### 2. 将`ca.pem` `cert.pem` `key.pem`这3个文件拷贝到当前目录

```
scp ca.pem ./
scp cert.pem ./
scp key.pem ./
```

### 3. 使用docker客户端测试（注意修改证书路径）

```
docker --tlsverify \
    --tlscacert=/home/alex/.docker/certs/ca.pem \
    --tlscert=/home/alex/.docker/certs/cert.pem \
    --tlskey=/home/alex/.docker/certs/key.pem \
    -H=123.123.123.123:2376 version
```

### 4. 使用curl测试Docker API

```
curl https://123.123.123.123:2376/images/json \
  --cert ~/.docker/certs/cert.pem \
  --key ~/.docker/certs/key.pem \
  --cacert ~/.docker/certs/ca.pem
```

### 5. 配置默认远程调用服务器docker服务

```
# 配置~/.zshrc（或者~/.bashrc，根据你的客户端环境而定），在末尾添加以下几行
export DOCKER_HOST=tcp://123.123.123.123:2376 DOCKER_TLS_VERIFY=1
export DOCKER_CERT_PATH=~/.docker/certs/
# 然后让加载到当前会话
source .zshrc
# 测试
docker ps
```

#### *`务必非常小心保管这些key，它们就跟服务器root密码一样重要（众所周知docker是可以进行真实主机提权的）`