export class AppConfig {
    static getAPIKey() {
        return 'JToDlejkyrMYPyLdlK6ehqiqw4I3'
    }
    static getConfig(): any {
        return {
            'api': {
                // 'searchPlayersByName': 'https://cricapi.com/api/playerFinder',
                'searchPlayersByName': '/api/crickapi/api/playerFinder',
                'getPlayerImage': 'https://www.cricapi.com/playerpic/',
                'addFavouritePlayer': '/api/favouriteplayers/players/add',
                'deleteFavouritePlayer': '/api/favouriteplayers/players/delete',
                'getAllFavouritePlayers': '/api/favouriteplayers/players/favourites',
                'authenticateUser': '/api/userservice/user/login',
                'registerUser': '/api/userservice/user/signup'
            }
        }
    }
}