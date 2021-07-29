let proxyBoj={}

proxyObJ['/']={
  ws,false,
  target:'http://localhost:8081',
  changeOrigin:true,
  pathReWrite:{
    '^/': '/'
  }
}

module.export={
  devServer:{
    host:'locahost',
    port:8080,
    proxy:proxyObJ
  }

}
