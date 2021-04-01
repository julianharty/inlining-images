var path = require('path')
var fs = require('fs')

// Code from https://gist.github.com/victorsollozzo/4134793 copied locally here.

function recFindByExt(base,ext,files,result) 
{
    files = files || fs.readdirSync(base) 
    result = result || [] 

    files.forEach( 
        function (file) {
            var newbase = path.join(base,file)
            if ( fs.statSync(newbase).isDirectory() )
            {
                result = recFindByExt(newbase,ext,fs.readdirSync(newbase),result)
            }
            else
            {
                if ( file.substr(-1*(ext.length+1)) == '.' + ext )
                {
                    result.push(newbase)
                } 
            }
        }
    )
    return result
}

// Example call 
// ext_file_list = recFindByExt('/mypath','ext')

module.exports = {recFindByExt}