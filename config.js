module.exports = {
  port: 3001,
  adapters:[
    "smart-agg-adapter-http-basic"
  ],
  interfaces: {
    "http-basic": {
      port:3005
    }
  }
}
