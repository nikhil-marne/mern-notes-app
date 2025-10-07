
export function formatDate(date) {
    // 1. Convert the ISO string into a JavaScript Date object (CORRECT)
    const dateObject = new Date(date);

    // 2. Use the correctly capitalized method: toLocaleDateString (FIXED)
    return dateObject.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}