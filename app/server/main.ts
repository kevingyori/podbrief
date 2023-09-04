//itt fog lefutni sorban a 
//new podcast episode webhook (noti to db) -> podcast api 1: episode infos to db 2:download audio -> slice audio -> 
//transcript with whisper -> slice -> prompt chatgpt for all chunks -> combine -> pick bullet points, summary overview with gpt
//-> write to db, delete unneccessary files

//sending newwsletter