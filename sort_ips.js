var ip_addrs = [
    '213.61.108.26',
    '235.94.112.131',
    '162.219.166.100',
    '26.190.195.43',
    '96.113.27.227',
    '96.112.27.227',
    '96.112.29.227',
    '96.112.29.255',
    '164.124.74.26',
    '58.5.201.175',
    '228.131.119.187',
    '191.226.212.172',
    '65.70.48.227',
    '35.214.73.61',
    '149.14.104.245'
];

function compareTo(a, b) {
    var a_i = parseInt(a),
        b_i = parseInt(b);
    
    if ( a_i < b_i ) {
        return -1;
    }
    else if ( a_i > b_i ) {
        return 1;
    }
    else {
        return 0;
    }
}

function compareOctets(a, b) {
    return compareTo(a[0], b[0])
        || compareTo(a[1], b[1])
        || compareTo(a[2], b[2])
        || compareTo(a[3], b[3]);
}

var sorted_ip_addrs = ip_addrs
    .map( function(e)   { return e.split('.');       })
    .sort(function(a,b) { return compareOctets(a,b); })
    .map( function(a)   { return a.join('.');        });

console.log(sorted_ip_addrs.join("\n"));
