var EventEmitter = require("events")
class ProcsHandler extends EventEmitter {
    exec() {
        this.on("ps -Af: done", (output) => {
            var procs = this.transform(output)
            procs.forEach((e) => console.log(e))
        })

        var proc_handler = require("child_process")
        proc_handler.exec("ps -Af", (err, stdout, stderr) => {
            this.emit("ps -Af: done", stdout)
        })
    }

    transform(output) {
        var procs = [];

        var splitted = output.split(/\n|\r/)
        for (var i = 1; i < splitted.length - 1; i++) {
            var row = splitted[i].split(/\s+/)
            procs.push({
                pid: row[1],
                cmd: row.slice(7, row.length).join(" ")
            })
        }

        return procs
    }
}

class Procs {
    print() {
        new ProcsHandler().exec()
    }
}

module.exports = new Procs()