
module.exports = {
    apps : [{
        name                : "videomaker",
        max_memory_restart  : "300M",
        script              : "./server.js",
        instances           : 2,
        exec_mode           : "cluster",
        env: {
            NODE_ENV: "production",
            NODE_PORT: 9005
        }
    }]
}
