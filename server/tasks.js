const fs = require('fs')

const tasks = JSON.parse(fs.readFileSync('../tasks.geojson'))

tasks.features = tasks.features.map((x, i) => {
    return { index: i, ...x }
})

var handlers = []

function timestamp() {
    return (new Date()).toISOString().replace(/[:-]/g, '_')
}

function flush_to_disk(extra) {
    fs.writeFileSync('../tasks.geojson', JSON.stringify(tasks, null, 2))
}

function on_update(handler) {
    handlers.push(handler)
}

function update_task(nummer, done) {
    // save backup
    flush_to_disk(timestamp())
    tasks.features[nummer].properties.done = done

    // save main
    flush_to_disk()
    handlers.forEach(h => {
        h(tasks)
    })
}


module.exports = {
    update_task,
    on_update,
    tasks
}
