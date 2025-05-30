export const chapters = [
    {
      id: 1,
      name: "Chapter 1",
      imageCount: 10,
      directorNote:
        "KISHORE IS A LABOR OF LOVE THAT MERGES RICH STORYTELLING WITH STUNNING VISUALS. CRAFTED TO IGNITE THE IMAGINATION AND RESONATE DEEPLY WITH FANS OF MANGA AND BEYOND",
    },
    {
      id: 2,
      name: "Chapter 2",
      imageCount: 10,
      directorNote:
        "In Chapter 2, we delve deeper into the characters' motivations. The stunning artwork continues to evolve, revealing new layers of our narrative.",
    },
    {
      id: 3,
      name: "Chapter 3",
      imageCount: 10,
      directorNote:
        "Chapter 3 marks a turning point in our story. The visual storytelling reaches new heights, showcasing the full potential of our artistic vision.",
    },
  ]
  
  // export const getChapterImages = async (chapterId) => {
  //   const images = []
  //   const chapter = chapters.find((c) => c.id === chapterId)
  
  //   if (chapter) {
  //     for (let i = 1; i <= chapter.imageCount; i++) {
  //       const imagePath = `/src/assets/chapter-${chapterId}/p${i}.jpg`
  //       images.push(imagePath)
  //     }
  //   }
  
  //   return images
  // }
  
  export const getDirectorNote = (chapterId) => {
    const chapter = chapters.find((c) => c.id === chapterId)
    return chapter ? chapter.directorNote : ""
  }
  
  