#!/bin/bash

# Script to rewrite Git history distributing commits from March 1-21, 2024

# Get all commit hashes in reverse order (oldest first)
commits=($(git log --reverse --format="%H"))

total_commits=${#commits[@]}
echo "Total commits to redistribute: $total_commits"

# Date range: March 1-21, 2024 (21 days)
start_date="2024-03-01"
end_date="2024-03-21"

# Calculate time distribution
days=21
commits_per_day=$((total_commits / days))
remainder=$((total_commits % days))

echo "Distributing $total_commits commits across $days days"
echo "Approximately $commits_per_day commits per day"

# Create a new orphan branch
git checkout --orphan temp-branch

# Remove all files from staging
git rm -rf .

# Counter for commit distribution
commit_index=0
current_day=0

# Function to get date for a specific day offset
get_date() {
    local day_offset=$1
    date -j -v+${day_offset}d -f "%Y-%m-%d" "$start_date" "+%Y-%m-%d"
}

# Reapply commits with new dates
for commit_hash in "${commits[@]}"; do
    # Calculate which day this commit should be on
    current_day=$((commit_index / ((total_commits + days - 1) / days)))
    
    # Get the date for this commit
    commit_date=$(get_date $current_day)
    
    # Random hour between 9 AM and 6 PM
    hour=$((9 + RANDOM % 10))
    minute=$((RANDOM % 60))
    second=$((RANDOM % 60))
    
    commit_datetime="${commit_date} ${hour}:${minute}:${second}"
    
    echo "Processing commit $((commit_index + 1))/$total_commits on $commit_datetime"
    
    # Checkout the files from the original commit
    git checkout $commit_hash -- . 2>/dev/null || true
    
    # Get original commit message
    commit_message=$(git log -1 --format="%B" $commit_hash)
    
    # Stage all changes
    git add -A
    
    # Create new commit with modified date
    GIT_AUTHOR_DATE="$commit_datetime" GIT_COMMITTER_DATE="$commit_datetime" \
        git commit -m "$commit_message" --allow-empty
    
    commit_index=$((commit_index + 1))
done

echo ""
echo "History rewrite complete!"
echo "To apply these changes:"
echo "1. Review the new history: git log --oneline"
echo "2. If satisfied, replace main branch: git branch -M temp-branch main"
echo "3. Force push to remote: git push -f origin main"
