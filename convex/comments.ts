import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

// -----------------------------
// ADD COMMENT
// -----------------------------
export const addComments = mutation({
  args: {
    content: v.string(),
    postId: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const currentUser = await getAuthenticatedUser(ctx);

    if (!currentUser) throw new ConvexError("User not authenticated");

    const post = await ctx.db.get(args.postId);
    if (!post) throw new ConvexError("Post Not Found");

    const commentId = await ctx.db.insert("comments", {
      userId: currentUser._id,
      postId: args.postId,
      content: args.content,
    });

    // Incrementa contador de comentários
    await ctx.db.patch(args.postId, { comments: (post.comments ?? 0) + 1 });

    // Cria notificação se o comentário não for no próprio post
    if (post.userId !== currentUser._id) {
      await ctx.db.insert("notifications", {
        receiverId: post.userId,
        senderId: currentUser._id,
        type: "comment",
        postId: args.postId,
        commentId,
      });
    }

    return commentId;
  },
});

// -----------------------------
// GET COMMENTS
// -----------------------------
export const getComment = query({
  args: { postId: v.id("posts") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_post", (q) => q.eq("postId", args.postId))
      .order("desc")
      .collect();

    const commentsWithInfos = await Promise.all(
      comments.map(async (comment) => {
        const user = await ctx.db.get(comment.userId);
        if (!user) return null; // ignora comentários sem user

        return {
          ...comment,
          user: {
            fullname: user.fullname,
            image: user.image,
          },
        };
      })
    );

    // filtra os nulos antes de retornar
    return commentsWithInfos.filter((c): c is NonNullable<typeof c> => c !== null);
  },
});
