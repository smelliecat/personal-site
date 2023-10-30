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

    if aggregated_content.strip():
        dialogue_line = f"{current_speaker}: {aggregated_content.strip()}"
        formatted_dialogue.append(dialogue_line)

    result = "\n".join(formatted_dialogue)

    return result

dialogue_with_given_roles = process_file_with_explicit_roles(file_path)
dialogue_with_given_roles 

# %%
def save_to_file(file_path, content):
    with open(file_path, 'w') as file:
        file.write(content)

output_file_path = 'DCB_se3_ag4_m_01_1_output_processed.txt'
processed_text = dialogue_with_given_roles  

save_to_file(output_file_path, processed_text)

print(f"The dialogue has been saved to {output_file_path}")

# %%
