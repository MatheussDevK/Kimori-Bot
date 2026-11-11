import fs from 'node:fs';
import toMs from 'ms';

 const addBanned = (userId, expired, _data) => {
    let success = false
    if (expired === undefined) expired = 'PERMANENT'

    let expired_at = 'PERMANENT'

    if (expired === 'PERMANENT') {
        expired_at = 'PERMANENT'
    } else {
        expired_at = Date.now() + toMs(expired)
    }

    const obj = {
        id: userId,
        expired: expired_at
    }

    _data.push(obj)
    fs.writeFileSync('./database/usuarios/banned.json', JSON.stringify(_data))
}

 const unBanned = (userId, _data) => {
    let position = null
    Object.keys(_data).forEach((i) => {
        if (_data[i].id === userId) {
            position = i
        }
    })
    if (position !== null) {
        _data.splice(position, 1)
        fs.writeFileSync('./database/usuarios/banned.json', JSON.stringify(_data))
    }
    return true
}
const BannedExpired = (_dir) => {
    setInterval(() => {
        let position = null
        Object.keys(_dir).forEach((i) => {
            if (_dir[i].expired === 'PERMANENT') {
                position = null
            } else if (Date.now() >= _dir[i].expired) {
                position = i
            }
        })
        if (position !== null) {
            console.log(`Banned expired: ${_dir[position].id}`)
            _dir.splice(position, 1)
            fs.writeFileSync('./database/usuarios/banned.json', JSON.stringify(_dir))
        }
    }, 1000)
}

 const cekBannedUser = (userId, _dir) => {
    let status = false
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].id === userId) {
            status = true
        }
    })
    return status
}

export default {
    addBanned,
    unBanned,
    BannedExpired,
    cekBannedUser
}
export { addBanned, unBanned, BannedExpired, cekBannedUser };
