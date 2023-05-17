module.exports = {
  apps : [{
    name   : "turbo",
    instances: 2,
    script : "/usr/bin/pnpm",
    args: "--filter nextjs start",
    exec_mode: "cluster"
  }]
}
