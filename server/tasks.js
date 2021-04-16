const fs = require('fs')

const tasks = JSON.parse(fs.readFileSync('../tasks.geojson'))

tasks.features = tasks.features.map((x, i) => {
    return { index: i, ...x }
})

var handlers = []

function on_update(handler) {
    handlers.push(handler)
}

function update_task(nummer, done) {
    tasks.features[nummer].properties.done = done
    handlers.forEach(h => {
        h(tasks)
    })


}


module.exports = {
    update_task,
    on_update,
    tasks
}
