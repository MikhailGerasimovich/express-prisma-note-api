export class NoteFrontend {
  constructor(noteObject) {
    this.id = noteObject.id;
    this.title = noteObject.title;
    this.description = noteObject.description;
    this.updatedAt = noteObject.updatedAt;
    this.location = noteObject.location;

    this.tags = noteObject.tags.map((obj) => ({
      id: obj.tag.id,
      title: obj.tag.title,
    }));

    this.color = {
      id: noteObject.color.id,
      title: noteObject.color.title,
    };
  }
}
