console.log('pt.js loaded');

pt={};

pt.getData=async _=>{
    //pt.data = await(await fetch('https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json')).json()
    pt.data = await(await fetch('PeriodicTableJSON.json')).json()
    // index
    pt.sbl = {}
    pt.data.elements.forEach(el=>{ // index by symbol to pt.sbl
        pt.sbl[el.symbol]=pt[el.symbol]=el // element both as pt[] and pt.sbl[]
    })
    //debugger
}

pt.dumpMasses= async()=>{ // by creating (dumping...) variables in the global scope with names of the elements
    if(!pt.sbl){
        await pt.getData()
    }
    Object.keys(pt.sbl).forEach(k=>{
        window[k]=pt.sbl[k].atomic_mass
    })
    //debugger
} ;

pt.eval=str=>{
   str = str.replace(/(\D)(\d)/g,'$1*$2')
   str = str.replace(/(\d)(\D)/g,'$1\+$2')
   str = str.replace(/([a-z])([A-Z]+)/g,'$1\+$2')
   str = str.replace(/\+\)/g,')')
   str = str.replace(/^(\d+)(.*)/,'$1\*\($2\)')
   str = str.replace(/\(\+/g,'(')
   let y = eval(str)
   console.log(str+' = '+y)
   return y
}

(async()=>{
    await pt.dumpMasses()
})()

if(typeof(define)!='undefined'){
    define(pt)
}