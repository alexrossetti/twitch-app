var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "draskyl", "sheevergaming", "CohhCarnage"];


$(document).ready(function(){
    getStreams(0);
    
    function getOfflineInfo(url){

        $.ajax({
            type: 'GET',
            url: url,
            headers: {
              'Client-ID': 'i07hil5cc35r98bsoz0mlso1szfu2f'
            },
            success: function(data) {
                showCard(data.display_name, "offline", data.logo);
            }
        });

    }

    // argument decides which streams to display - 1 for all, 0 for online only, 2 for offline only
    function getStreams(choice){

        $("#streamers").html("");
        
        for (let i = 0; i < channels.length; i++){

            $.ajax({
                type: 'GET',
                url: 'https://api.twitch.tv/kraken/streams/'+channels[i],
                headers: {
                  'Client-ID': 'i07hil5cc35r98bsoz0mlso1szfu2f'
                },
                success: function(data) {

                    var status, name, logo;

                    if (data.stream===null){
                        if (choice !== 1){
                            status = "offline";
                            getOfflineInfo(data._links.channel);
                        }
                    } else {
                        if (choice !== 2){
                            status = "online";
                            name = data.stream['channel'].display_name;
                            logo = data.stream['channel'].logo;
                            showCard(name, status, logo);
                        }
                    }
                }
            });

        }
    }

    function showCard(name, status, logo){

        var html = "<div class='col-lg-3 col-md-4 col-sm-6 col-12'>\
                        <div class='card streamer'>\
                            <div class='card-img-top logo' style='background-image:url("+logo+")' alt='Card image cap'></div>\
                            <div class='card-body "+status+"'>\
                                <h6 class='card-title'>"+name+"</h6>\
                                <p class='card-title'>"+status.substr(0,1).toUpperCase()+status.substr(1)+"</p>\
                            </div>\
                        </div>\
                    </div>"; 
        
        $("#streamers").append(html);
    }


    $(function(){
        $("#showAll").click(function(){
            getStreams(0);
            $("#showAll").addClass("active");
            $("#showOnline").removeClass("active");
            $("#showOffline").removeClass("active");
        });
        $("#showOnline").click(function(){
            getStreams(1);
            $("#showAll").removeClass("active");
            $("#showOnline").addClass("active");
            $("#showOffline").removeClass("active");
        });
        $("#showOffline").click(function(){
            getStreams(2);
            $("#showAll").removeClass("active");
            $("#showOnline").removeClass("active");
            $("#showOffline").addClass("active");
        });
    })

});