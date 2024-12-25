public class PostDTO
{
    public int PostId { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<ImageDTO>? Images { get; set; }
}

public class ImageDTO
{
    public string ImageUrl { get; set; }
}
