using Newtonsoft.Json.Linq;
using RestSharp;

namespace ModHub.Handlers
{
    public class ImagesHandler
    {
        public async Task<string?> PostImage(string? imageString)
        {
            if (string.IsNullOrEmpty(imageString))
            {
                return null;
            }
            
            if(IsValidImageUrlString(imageString))
            {
                return imageString;
            }

            const string imgurUrl = "https://api.imgur.com/3/image";
            const string clientId = "2de0f9a764a6355";

            var client = new RestClient();
            var request = new RestRequest(method: Method.Post, resource: imgurUrl);
            request.AddHeader("Authorization", "Client-ID " + clientId);
            request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            request.AddParameter("image", imageString);
            try
            {
                var response = await client.ExecuteAsync(request);
                dynamic responseJson = JObject.Parse(response.Content);
                string? imageUrl = responseJson.data.link;
                return string.IsNullOrEmpty(imageUrl) ? string.Empty : imageUrl;
            }
            catch
            {
                return string.Empty;
            }
        }

        public bool IsValidImageUrlString(string? url)
        {
            if (string.IsNullOrEmpty(url))
            {
                return true;
            }
            
            var result = Uri.TryCreate(url, UriKind.Absolute, out Uri uriResult)
                         && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
            return result;
        }
    }
}