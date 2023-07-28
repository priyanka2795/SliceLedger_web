<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
   
    <title>{{ $cmsData->title }} </title>
</head>

<body style="margin:0; background-color: #f4f4f4">
    <style type="text/css">
        
            @media only screen and (min-width: 767px){
                .tableFull, .tableHAlf {
                    width:320px !important;
                }
            }
    </style>
    <table style="width: 100; max-width: 100%; margin: 0 auto; font-size: 14px; color: gray; padding-top: 0rem; box-shadow: 0 0 30px rgba(37,45,51,.1) !important;padding: 0px 67px;">
        <tbody>
            <tr style="color: #000;">
                <td>
                    <table style="width: 100%; padding: 2rem;">
                        <tr>
                            <td width="" style="width: 100%; text-align:center;">
                                <a href="" style="text-decoration: none; font-family: sans-serif;">
                                    <strong style="font-size: 50px; color: #333;">
                                      
                                           Sliceledger
                                    </strong>
                                </a>
                                
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <tr>
                <td style="font-family: sans-serif; width: 100%;color: #000; font-size: 16PX; text-align: left;">
                    <h2 style="font-size: 18px; text-align: center;">{{  $cmsData->title }}</h2>
                    
                    <P style="color: #666; font-size: 15px;">
                    
                        {{ strip_tags(html_entity_decode(($cmsData->description))) }} 
                        
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
</body>
</html>