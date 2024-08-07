// enums.ts
export enum ContentTypes {
    default = "default",
    website = "website",
    mail = "mail",
    date = "date",
    price = "price",
    time = "time",
    address = "address",
    tel = "tel",
    instagram = "instagram",
    youtube = "youtube",
    soundcloud = "soundcloud",
    spotify = "spotify",
    facebook = "facebook",
    bandcamp = "bandcamp",
    telegram = "telegram",
    discord = "discord",
    twitter = "twitter",
    add = "add",
    name = "name",
    description = "description",
    category = "category",
    concepts = "concepts",
    connections = "connections",
    collectives = "collectives",
    collaborations = "collaborations",
    creatives = "creatives",
    info = "info",
    close = "close",
    share = "share",
    days = "days",
    weeks = "weeks",
    carousel = "carousel",
    github = "github",
    form = "form",
    search = "search",
  }
  
  export enum RelationType {
    Left = "left",
    Right = "right",
    Center = "center",
    Above = "above",
    Below = "below",
    Inside = "inside",
    Outside = "outside",
    Before = "before",
    After = "after",
    Next = "next",
    Previous = "previous",
  }
  
  export enum CommandType {
    Start = "start",
    Confirm = "confirm",
    Cancel = "cancel",
    Change = "change",
    Create = "create",
    Check = "check",
    Connect = "connect",
    Clear = "clear",
  }
  
  export enum StatusType {
    Creating = "creating",
    Created = "created",
    Canceled = "canceled",
    Changed = "changed",
    Confirmed = "confirmed",
    Changing = "changing",
    Closed = "closed",
  }
  
  export enum Language {
    EN = 'en',
    DE = 'de',
  }
  
  export enum MessageType {
    WELCOME = "welcome",
    UNKNOWN = "unknown",
    INVALID_COMMAND = "invalid_command",
    NO_CHANGES_DETECTED = "no_changes_detected",
    NO_CONTENT_DETECTED = "no_content_detected",
    FAILED_TO_DELETE_MESSAGE = "failed_to_delete_message",
    FAILED_TO_SEND_MESSAGE = "failed_to_send_message",
    EVENT_MANAGER_BOT = "event_manager_bot",
    EXAMPLE_MESSAGE = "example_message",
    EXAMPLE_RESPONSE = "example_response",
    CHANGE_MESSAGE = "change_message",
    MODERATION_POLL = "moderation_poll",
    MODERATION_APPROVE = "moderation_approve",
    MODERATION_REQUEST = "moderation_request",
    MODERATION_REJECT = "moderation_reject",
    MODERATION_DELETE_REQUEST = "moderation_delete_request",
    NOT_CREATED_YET = "not_created_yet",
    MODERATION_CANCEL = "moderation_cancel",
    MODERATION_CANCEL_REQUEST = "moderation_cancel_request",
  }
  