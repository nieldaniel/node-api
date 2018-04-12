const express = require('express')

const app = express()

/** 
 * ASYNC VS SYNC
 */

// function add2(integer) {
//     return integer + 2
// }

// const sync = add2(2) // 4

// console.log('SYNC', sync)

function asyncAdd2(integer, cb) {
    if (typeof integer !== 'number') {
        return cb('"Bukan integer"', null)
    }

    const hasil = integer + 2;

    return cb(null, hasil)
}

asyncAdd2(10, function(err, hasil) {
    if (err) {
        console.log('Add err, dan errnya', err)
    }

    console.log('Hasilnya adalah', hasil)
})

app.listen(3000, function(err) {
    if (err) {
        console.log('Ada error tuh')
    }

    console.log("My app started at http://localhost:3000")
})
