using System;

public class Image
{
    public int ImageId { get; set; }
    public int PostId { get; set; }
    public string ImageUrl { get; set; }
    public DateTime CreatedAt { get; set; }

    public Post Post { get; set; }
}
