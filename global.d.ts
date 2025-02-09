interface Global {

    ErrorUtils: {
       setGlobalHandler: any
       reportFatalError: any
       getGlobalHandler: any
    }
 
 }
 
 declare var global: Global