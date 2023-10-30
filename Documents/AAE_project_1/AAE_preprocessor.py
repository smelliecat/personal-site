#%%
import re
# Define the file path
file_path = 'DCB_se3_ag4_m_01_1.txt'

# %%
def process_file_with_explicit_roles(file_path):
    with open(file_path, 'r') as f:
        lines = f.readlines()

    # Skipping the header
    lines = lines[1:]

    data = []
    for line in lines:
        parts = line.strip().split('\t')
        if len(parts) >= 4:  # Ensure the line has enough parts to avoid index errors
            data.append(parts)

    formatted_dialogue = []

    # Auxiliary variables to handle the conversation flow and content aggregation
    current_speaker = None
    aggregated_content = ""

    for row in data:
        speaker_role = row[1]  # Here the role is directly taken from the "Spkr" column
        content = row[3]

        # Remove indications of pauses and extra spaces
        content = re.sub(r"\(pause [0-9.]*\)", "", content)
        content = re.sub(r"\s+", " ", content).strip()  # Remove extra whitespace

        if current_speaker is None:
            current_speaker = speaker_role  # Start the conversation with the first speaker

        # If the speaker changes, we need to save the aggregated content under the previous speaker
        if speaker_role != current_speaker:
            # Save the previous speaker's content, if it exists
            if aggregated_content.strip():  # Avoid adding empty dialogue
                dialogue_line = f"{current_speaker}: {aggregated_content.strip()}"
                formatted_dialogue.append(dialogue_line)

            # Start aggregating content for the new speaker
            current_speaker = speaker_role
            aggregated_content = content + " "
        else:
            # If the speaker hasn't changed, continue aggregating content
            aggregated_content += content + " "

    # Add the last part of the dialogue if not empty
    if aggregated_content.strip():
        dialogue_line = f"{current_speaker}: {aggregated_content.strip()}"
        formatted_dialogue.append(dialogue_line)

    # Join the formatted dialogues with new lines
    result = "\n".join(formatted_dialogue)

    return result

# Process the new file where roles are explicitly provided in the "Spkr" column
dialogue_with_given_roles = process_file_with_explicit_roles(file_path)
dialogue_with_given_roles  # Display the output

# %%
# This function saves content to a file.
def save_to_file(file_path, content):
    with open(file_path, 'w') as file:
        file.write(content)

# Specify the path where you want to save the file. 
# Make sure you have the necessary permissions for the directory.
output_file_path = 'DCB_se3_ag4_m_01_1_output_processed.txt'

# This is the variable containing the processed text you want to save.
# Make sure 'processed_text' contains the actual text you want to save.
processed_text = dialogue_with_given_roles  # or whatever variable you have your text stored in

# Call the function with the appropriate arguments
save_to_file(output_file_path, processed_text)

print(f"The dialogue has been saved to {output_file_path}")

# %%
